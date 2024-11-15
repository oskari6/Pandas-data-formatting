import requests
import os
import shutil
import random

API_KEY = "d664j9bmedwGgvYxrDr380F5kTA1qkJJ0F18akcHSK0lPt6CMU2O9Dkf"
BASE_URL = "https://api.pexels.com/v1/search"
QUERY = "house"
HEADERS = {"Authorization": API_KEY}
SAVE_FOLDER = "real_estate_images"

os.makedirs(SAVE_FOLDER, exist_ok=True)

def download_images():
    params = {"query":QUERY, "per_page": 1000}
    response = requests.get(BASE_URL, headers=HEADERS, params=params)
    data = response.json()
    for photo in data.get("photos", []):
        img_url = photo["src"]["large"]
        img_name = os.path.join(SAVE_FOLDER, os.path.basename(img_url.split("?")[0]))
        img_data = requests.get(img_url).content
        with open(img_name, "wb") as img_file:
            img_file.write(img_data)
    print("Downloaded")

#download_images()

SOURCE_FOLDER = "real_estate_images"
TARGET_FOLDER = "real_estate_images_random"
TOTAL_IMAGES = 1000

os.makedirs(TARGET_FOLDER, exist_ok=True)

def multiply_images():
    images = os.listdir(SOURCE_FOLDER)
    image_count = len(images)
    if image_count == 0:
        print("No images found")
        return
    print("found images")

    randomized_images = [random.choice(images) for _ in range(TOTAL_IMAGES)]

    for idx, image in enumerate(randomized_images):
        source_path = os.path.join(SOURCE_FOLDER, image)
        new_image_name = f"image_{idx + 1}.jpg"
        target_path = os.path.join(TARGET_FOLDER, new_image_name)
        shutil.copy2(source_path, target_path)
    print("done")

multiply_images()