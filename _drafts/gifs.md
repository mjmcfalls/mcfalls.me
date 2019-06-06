---
layout: post
title:  "TEST!"
date:   2018-07-07 23:34:02 +0000
categories: jekyll update
path: gifs
---
{% for image in site.static_files %}
    {% if image.path contains 'images/slider' %}
        <img src="{{ site.baseurl }}{{ image.path }}" alt="image" />
    {% endif %}
{% endfor %}