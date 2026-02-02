from app.config import POINTS

def first_builders_label(labels):
    for label in labels:
        if label["name"].startswith("builders:"):
            return label["name"]
    return None

def get_points(label_name):
    return POINTS.get(label_name, 0)