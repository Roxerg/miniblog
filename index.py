import sys
import os, os.path
from flask import Flask, render_template, send_from_directory, url_for, send_file, redirect
from flask import render_template_string, Markup
from flask_flatpages import FlatPages, pygmented_markdown, pygments_style_defs
import markdown
from datetime import datetime
import time
import urllib.parse

DEBUG = True
FLATPAGES_AUTO_RELOAD = DEBUG
FLATPAGES_EXTENSION = '.md'
app = Flask(__name__)
app.config.from_object(__name__)
pages = FlatPages(app)

site_url = "https://blog.rokasg.tech/"

other_urls = ["vapor", "snake"]


def code_renderer(text):
    """Inject the markdown rendering into the jinga template"""
    rendered_body = render_template_string(text)
    pygmented_body = markdown.markdown(rendered_body, extensions=['codehilite', 'fenced_code'])
    return pygmented_body

@app.route('/pygments.css')
def pygments_css():
    return pygments_style_defs('tango'), 200, {'Content-Type': 'text/css'}

app.config.update({
    'FLATPAGES_EXTENSION': ['.md', '.markdown'],
    'FLATPAGES_MARKDOWN_EXTENSIONS': ['codehilite', 'fenced_code'],
    'FLATPAGES_HTML_RENDERER': code_renderer
})



def ts(s):
    return time.mktime(datetime.strptime(s.isoformat(), "%Y-%m-%d").timetuple())

def getlink(alt):
    return (site_url + urllib.parse.quote(alt, safe='') +"/")

def gettwitter(alt, title):
    url = getlink(alt)
    safetitle = urllib.parse.quote(title, safe='')
    return ("https://twitter.com/share?text=" + safetitle +"&url=" + url)

def getfacebook(alt, title):
    url = getlink(alt)
    safetitle = urllib.parse.quote(title, safe='')
    return ("https://www.facebook.com/sharer/sharer.php?u="+url)

def getreddit(alt, title):
    url = getlink(alt)
    safetitle = urllib.parse.quote(title, safe='')
    return ("https://reddit.com/submit/?url="+url+"&amp;resubmit=true&amp;title="+safetitle)




@app.route("/wow")
def aaa():
    benis = [p for p in pages if 'published' in p.meta]
    benis.sort(key=lambda x: ts(x.meta["published"]))
    return str([b.meta["published"] for b in benis])



@app.route("/")
def main(name=None):

    posts = []
    titles = []

    posts = [p for p in pages if 'published' in p.meta]

    posts.sort(key=lambda x: ts(x.meta["published"]), reverse=True)
    titles = posts


    for post in posts:
        post.meta["reddit"] = getreddit(post.meta["alt"], post.meta["title"])
        post.meta["facebook"] = getfacebook(post.meta["alt"], post.meta["title"])
        post.meta["twitter"] = gettwitter(post.meta["alt"], post.meta["title"])
        post.meta["link"] = getlink(post.meta["alt"])
        if "short" in post.meta:
            post.meta["click"] = ""
            post.meta["card"] = "card-toggle"
            post.meta["cardtext"] = "card-text-toggle"  
            post.meta["button"] = ""
        else:
            post.meta["click"] = "toggleExpand(this)"
            post.meta["card"] = ""
            post.meta["cardtext"] = ""
            post.meta["button"] = "hidden"
            
         

    titles.sort(key=lambda x: ts(x.meta["published"]), reverse=True)
    js = url_for('static', filename='main.js')
    fb = url_for('static', filename="fb.png")
    return render_template("index.html", name=name, posts=posts, titles=titles, js=js, fb=fb, year=datetime.now().year, other_urls=other_urls)


@app.route('/<path:path>/')
def single(path=None):
    posts = []
    titles = []

    posts = [p for p in pages if (path == p.meta["alt"]) and ('published' in p.meta)]

    for post in posts:
        post.meta["twitter"] = gettwitter(post.meta["alt"], post.meta["title"])
        post.meta["link"] = getlink(post.meta["alt"])
    

    titles.sort(key=lambda x: ts(x.meta["published"]), reverse=True)

    js = url_for('static', filename='main.js')
    fb = url_for('static', filename="fb.png")
    
    return render_template("single.html", name=None, posts=posts, js=js, fb=fb, year=datetime.now().year, home=site_url)


if __name__ == '__main__':
    app.run()
