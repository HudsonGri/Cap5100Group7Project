import json
import sqlite3

DATABASE_PATH = "./users.db"
JSON_SAVE_PATH = "./users.json"


def export_db_to_json():
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT user_id, data FROM users")
    rows = cursor.fetchall()
    output = []
    for row in rows:
        user_id = row[0]
        data = row[1]
        if data:
            try:
                data = json.loads(data)
            except json.JSONDecodeError:
                data = {}
        else:
            data = {}
        output.append({
            "user": user_id,
            "data": data
        })
    conn.close()
    with open(JSON_SAVE_PATH, "w") as f:
        json.dump(output, f, indent=4)


if __name__ == "__main__":
    export_db_to_json()
