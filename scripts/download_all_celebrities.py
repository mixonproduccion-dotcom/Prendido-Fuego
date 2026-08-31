import os
import re
import sys
import json
import time
import urllib.request
import urllib.parse
from PIL import Image
import io
import concurrent.futures

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8"
}

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
ASSETS_DIR = os.path.join(ROOT_DIR, "assets", "celebrities")
os.makedirs(ASSETS_DIR, exist_ok=True)

def clean_name(raw_name):
    clean = raw_name
    # Extract parenthesis content if helpful or remove it
    # e.g., "Caro Pardíaco (Julián Kartun)" -> "Caro Pardíaco"
    # "Juliana 'Furia' Scaglione" -> "Juliana Furia Scaglione"
    clean = clean.replace("'", "").replace('"', '').strip()
    return clean

def get_search_queries(person):
    raw_name = person.get("name", "")
    pid = person.get("id", "")
    category = person.get("category", "")
    tag = person.get("tag", "")

    queries = []
    
    # 1. Main clean name
    clean1 = clean_name(raw_name)
    queries.append(clean1)
    
    # 2. Name without parenthesis
    if "(" in raw_name:
        main_part = raw_name.split("(")[0].strip().replace("'", "").replace('"', '')
        queries.append(main_part)
        # also subpart inside parenthesis if it looks like a real name e.g. (Julián Kartun) or (Thomás Tobar)
        inner = raw_name.split("(")[1].split(")")[0].strip()
        if not inner.lower().startswith("mamá") and not inner.lower().startswith("el ") and not inner.lower().startswith("la ") and len(inner.split()) >= 2:
            queries.append(inner)

    # 3. Contextual queries for duckduckgo / wiki
    if "gh" in category.lower() or "gran hermano" in tag.lower():
        queries.append(f"{clean1} Gran Hermano Argentina")
    elif "streaming" in category.lower() or "stream" in tag.lower() or "luzu" in tag.lower() or "olga" in tag.lower():
        queries.append(f"{clean1} streaming")
    elif "musica" in category.lower() or "cantante" in tag.lower() or "trap" in tag.lower():
        queries.append(f"{clean1} cantante argentina")
    elif "futbol" in category.lower():
        queries.append(f"{clean1} jugador argentina")
    elif "politica" in category.lower():
        queries.append(f"{clean1} politica argentina")
    else:
        queries.append(f"{clean1} argentina")
        
    return list(dict.fromkeys(queries)) # unique preserve order

def get_wiki_image(query):
    try:
        url = f"https://es.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch={urllib.parse.quote(query)}&gsrlimit=1&prop=pageimages&pithumbsize=600&format=json"
        req = urllib.request.Request(url, headers={"User-Agent": "PrendidoFuegoApp/1.0 (streaming@prendidofuego.tv)"})
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            if data.get("query") and data["query"].get("pages"):
                page = list(data["query"]["pages"].values())[0]
                if page.get("thumbnail"):
                    return page["thumbnail"]["source"]
    except Exception:
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
            if img_url and not img_url.endswith(".svg") and not "lookaside.fbsbx.com" in img_url:
                return img_url
    except Exception:
        pass
    return None

def download_and_process(url, out_path):
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = resp.read()
            if len(data) < 1500:
                return False
            img = Image.open(io.BytesIO(data))
            if img.mode != "RGB":
                img = img.convert("RGB")
            # Resize if large
            img.thumbnail((600, 600), Image.Resampling.LANCZOS)
            img.save(out_path, "JPEG", quality=85)
            return True
    except Exception:
        return False

def create_fallback_avatar(name, out_path, category=""):
    try:
        # Create a stylized gradient avatar with initials
        from PIL import ImageDraw, ImageFont
        img = Image.new("RGB", (500, 500), color=(26, 26, 36))
        draw = ImageDraw.Draw(img)
        
        # Gradient background simulation
        for i in range(500):
            r = int(255 - (i / 500) * 180) if "gh" in category else int(245 - (i / 500) * 100)
            g = int(50 + (i / 500) * 50)
            b = int(100 + (i / 500) * 155)
            draw.line([(0, i), (500, i)], fill=(min(255, max(0, r//4)), min(255, max(0, g//4)), min(255, max(0, b//4))))
        
        # Initials
        words = [w for w in name.split() if len(w) > 0 and w[0].isupper()]
        initials = "".join([w[0] for w in words[:2]]) if words else name[:2].upper()
        
        # Draw initials text
        draw.text((250, 250), initials, fill=(255, 100, 50), anchor="mm")
        img.save(out_path, "JPEG", quality=85)
        return True
    except Exception:
        return False

def process_person(person):
    pid = person["id"]
    name = person["name"]
    out_file = os.path.join(ASSETS_DIR, f"{pid}.jpg")

    # If already downloaded and valid (> 3KB), skip
    if os.path.exists(out_file) and os.path.getsize(out_file) > 3000:
        return {"id": pid, "name": name, "status": "ALREADY_EXISTS", "size": os.path.getsize(out_file)}

    queries = get_search_queries(person)
    
    # 1. Try Wikipedia for all queries
    for q in queries[:2]:
        img_url = get_wiki_image(q)
        if img_url:
            if download_and_process(img_url, out_file):
                return {"id": pid, "name": name, "status": "WIKI_SUCCESS", "size": os.path.getsize(out_file), "url": img_url}

    # 2. Try DuckDuckGo
    for q in queries:
        img_url = get_duckduckgo_image(q + " foto")
        if img_url:
            if download_and_process(img_url, out_file):
                return {"id": pid, "name": name, "status": "DDG_SUCCESS", "size": os.path.getsize(out_file), "url": img_url}
        time.sleep(0.2)

    # 3. Fallback avatar
    create_fallback_avatar(name, out_file, person.get("category", ""))
    return {"id": pid, "name": name, "status": "FALLBACK_AVATAR", "size": os.path.getsize(out_file)}

def main():
    # Read data_celebrities.js
    data_celeb_path = os.path.join(ROOT_DIR, "data_celebrities.js")
    with open(data_celeb_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Parse JSON from data_celebrities.js
    m = re.search(r"const\s+CELEBRITIES_DATABASE\s*=\s*(\[[\s\S]*?\]);", content)
    if not m:
        print("Error: Could not parse CELEBRITIES_DATABASE")
        return

    celebs = json.loads(m.group(1))
    print(f"Loaded {len(celebs)} celebrities from data_celebrities.js", flush=True)

    # Extra people from bandos / ranking / tribunal
    extra_people = [
        {"id": "joaqui", "name": "La Joaqui", "category": "musica"},
        {"id": "luckra", "name": "Luck Ra", "category": "musica"},
        {"id": "enzo", "name": "Enzo Fernández", "category": "futbol"},
        {"id": "valentina", "name": "Valentina Cervantes", "category": "farandula"},
        {"id": "chino-ku", "name": "Martín El Chino Ku", "category": "gh"},
        {"id": "marisol", "name": "Marisol Unzaga", "category": "farandula"},
        {"id": "florvigna", "name": "Flor Vigna", "category": "farandula"},
        {"id": "siciliani", "name": "Griselda Siciliani", "category": "farandula"},
        {"id": "futbol-tradicional", "name": "Fútbol Tradicional Argentino", "category": "futbol"},
        {"id": "wanda", "name": "Wanda Nara", "category": "farandula"},
        {"id": "china", "name": "La China Suárez", "category": "farandula"},
        {"id": "tini", "name": "Tini Stoessel", "category": "musica"},
        {"id": "emilia", "name": "Emilia Mernes", "category": "musica"},
        {"id": "coty", "name": "Coty Romero", "category": "gh"},
        {"id": "tora", "name": "La Tora Villar", "category": "gh"},
        {"id": "nicki", "name": "Nicki Nicole", "category": "musica"},
        {"id": "pesopluma", "name": "Peso Pluma", "category": "musica"},
        {"id": "occhiato", "name": "Nico Occhiato", "category": "streaming"},
        {"id": "migue", "name": "Migue Granados", "category": "streaming"}
    ]

    all_people = list(celebs)
    existing_ids = {c["id"] for c in celebs}
    for ep in extra_people:
        if ep["id"] not in existing_ids:
            all_people.append(ep)
            existing_ids.add(ep["id"])

    print(f"Total people to process: {len(all_people)}", flush=True)

    results = []
    # Run with 6 workers
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as executor:
        future_to_person = {executor.submit(process_person, p): p for p in all_people}
        for future in concurrent.futures.as_completed(future_to_person):
            res = future.result()
            results.append(res)
            print(f"[{len(results)}/{len(all_people)}] {res['name']} ({res['id']}) -> {res['status']} ({res['size']} B)", flush=True)

    # Summary
    wiki_count = sum(1 for r in results if r['status'] == 'WIKI_SUCCESS')
    ddg_count = sum(1 for r in results if r['status'] == 'DDG_SUCCESS')
    exists_count = sum(1 for r in results if r['status'] == 'ALREADY_EXISTS')
    fallback_count = sum(1 for r in results if r['status'] == 'FALLBACK_AVATAR')
    
    print("\n================== RESUMEN DE DESCARGAS ==================", flush=True)
    print(f"Total procesados: {len(results)}", flush=True)
    print(f"Descargados de Wikipedia: {wiki_count}", flush=True)
    print(f"Descargados de DuckDuckGo: {ddg_count}", flush=True)
    print(f"Ya existían: {exists_count}", flush=True)
    print(f"Fallback avatar: {fallback_count}", flush=True)
    print(f"Archivos guardados en: {ASSETS_DIR}", flush=True)

if __name__ == "__main__":
    main()
