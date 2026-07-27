---
layout: base.njk
title: Projects
---

# Projects

Coursework and side builds. Each page includes title, date, and a short description.

<ul class="project-list">
{% for project in collections.projects %}
  <li>
    <a href="{{ project.url }}">
      <strong>{{ project.data.title }}</strong>
      <span>{{ project.data.description }}</span>
      <time datetime="{{ project.date | date('%Y-%m-%d') }}">{{ project.date | date("%b %Y") }}</time>
    </a>
  </li>
{% endfor %}
</ul>
