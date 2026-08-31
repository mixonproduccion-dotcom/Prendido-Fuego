import os
import re
import sys
import json
import time
import urllib.request
import urllib.parse
from PIL import Image
import io

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8"
}

def clean_name_for_search(raw_name):
    clean = raw_name
    if "(" in clean:
        parts = clean.split("(")
        clean = parts[0].strip()
    clean = clean.replace("'", "").replace('"', '').strip()
    return clean

def get_wiki_image(name):
    try:
        clean = clean_name_for_search(name)
        url = f"https://es.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch={urllib.parse.quote(clean)}&gsrlimit=1&prop=pageimages&pithumbsize=600&format=json"
        req = urllib.request.Request(url, headers={"User-Agent": "PrendidoFuegoMedia/1.0 (info@prendidofuego.com)"})
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            if data.get("query") and data["query"].get("pages"):
                page = list(data["query"]["pages"].values())[0]
                if page.get("thumbnail"):
                    return page["thumbnail"]["source"]
    except Exception as e:
        pass
    return None

def get_duckduckgo_image(query):
    try:
        url = f"https://duckduckgo.com/?q={urllib.parse.quote(query)}&iax=images&ia=images"
        req = urllib.request.Request(url, headers=HEADERS)
        html = urllib.request.urlopen(req, timeout=8).read().decode("utf-8")
        match = re.search(r"vqd=([\d-]+)", html)
        if not match:
            return None
        vqd = match.group(1)
        api_url = f"https://duckduckgo.com/i.js?l=es-es&o=json&q={urllib.parse.quote(query)}&vqd={vqd}&f=,,,&p=1"
        api_req = urllib.request.Request(api_url, headers=HEADERS)
        data = json.loads(urllib.request.urlopen(api_req, timeout=8).read().decode("utf-8"))
        results = data.get("results", [])
        for r in results:
            img_url = r.get("image")
            if img_url and not img_url.endswith(".svg"):
                return img_url
    except Exception as e:
        pass
    return None

def download_and_process_image(url, output_path):
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=12) as resp:
            content = resp.read()
            if len(content) < 1000:
                return False
            img = Image.open(io.BytesIO(content))
            if img.mode != "RGB":
                img = img.convert("RGB")
            # Resize if too large, max 600x600 keeping aspect ratio
            img.thumbnail((600, 600), Image.Resampling.LANCZOS)
            img.save(output_path, "JPEG", quality=85)
            return True
    except Exception as e:
        return False

test_list = [
    ("tomas-holder", "Tomás Holder"),
    ("diane-caracchi", "Diane Caracchi"),
    ("luli-case", "Luli Casé Rossi"),
    ("furia-scaglione", "Juliana 'Furia' Scaglione"),
    ("marcos-ginocchio", "Marcos Ginocchio (El Primo)"),
    ("lionel-messi", "Lionel Messi"),
    ("wanda-nara", "Wanda Nara"),
    ("migue-granados", "Migue Granados"),
    ("javier-milei", "Javier Milei"),
    ("caro-pardiaco", "Caro Pardíaco (Julián Kartun)")
]

os.makedirs("ruleta-prendido-fuego/assets/celebrities", exist_ok=True)

for cid, name in test_list:
    out_file = f"ruleta-prendido-fuego/assets/celebrities/{cid}.jpg"
    img_url = get_wiki_image(name)
    source = "wiki"
    if not img_url:
        search_q = f"{clean_name_for_search(name)} foto argentina"
        img_url = get_duckduckgo_image(search_q)
        source = "ddg"
    
    if img_url:
        ok = download_and_process_image(img_url, out_file)
        sz = os.path.getsize(out_file) if os.path.exists(out_file) else 0
        print(f"[{cid}] {name} -> {source} -> success={ok} (saved {sz} bytes)")
    else:
        print(f"[{cid}] {name} -> NO URL FOUND")
