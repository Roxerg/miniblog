import sys
import os, os.path
from flask import Flask, render_template, send_from_directory, url_for, send_file
from flask_flatpages import FlatPages
from datetime import datetime
import time

DEBUG = True
FLATPAGES_AUTO_RELOAD = DEBUG
FLATPAGES_EXTENSION = '.md'
app = Flask(__name__)
app.config.from_object(__name__)
pages = FlatPages(app)


def ts(s):
    return time.mktime(datetime.strptime(s.isoformat(), "%Y-%m-%d").timetuple())



@app.route("/wow")
def aaa():
    benis = [p for p in pages if 'published' in p.meta]
    benis.sort(key=lambda x: ts(x.meta["published"]))
    return str([b.meta["published"] for b in benis])

@app.route("/")
def main(name=None):
    
    posts = [p for p in pages if 'published' in p.meta]
    posts.sort(key=lambda x: ts(x.meta["published"]), reverse=True)
    titles = [p for p in pages if 'published' in p.meta]
    titles.sort(key=lambda x: ts(x.meta["published"]), reverse=True)
    js = url_for('static', filename='main.js')
    fb = url_for('static', filename="fb.png")
    return render_template("index.html", name=name, posts=posts, titles=titles, js=js, fb=fb, year=datetime.now().year)

def page(path):
    return pages.get(path).html


if __name__ == '__main__':
    app.run()