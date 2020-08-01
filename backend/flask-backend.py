import sys

from GameOfLife import GameOfLifeMatrix
import json
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

obj: GameOfLifeMatrix = GameOfLifeMatrix()


@app.route("/")
def index():
    return json.dumps({"data": "welcome"})


@app.route("/initialize", methods=["GET", "POST"])
def initialize():
    global obj
    try:
        data = dict(request.form)
        data = json.loads(data['data'])
        print(data)
        data_tuples = [(item['x'], item['y']) for item in data]
        obj = GameOfLifeMatrix(initial_state=data_tuples)
        return json.dumps({"status": True})
    except Exception:
        print(sys.exc_info()[2])
        return json.dumps({"status": False})


@app.route('/iterate/<iter_count>')
@app.route('/iterate', methods=['GET', 'POST'])
def iterate(iter_count=1):
    print("Before Iteration", obj, iter_count)
    for i in range(int(iter_count)):
        obj.run_iteration()
    print("After Iteration", obj)
    current_alive = list(obj.sparse_matrix_current)
    current_alive = [{"x": item[0], "y": item[1]} for item in current_alive]
    return json.dumps({"status": True, "data": current_alive})


@app.route('/refresh')
def refresh():
    global obj
    obj = GameOfLifeMatrix()
    return json.dumps({"status":True})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
