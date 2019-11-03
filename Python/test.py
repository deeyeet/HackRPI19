from flask import Flask, render_template, request
app = Flask(__name__)

@app.route('/')
def get_disaster_sort():
    return jsonify("Hello World!")