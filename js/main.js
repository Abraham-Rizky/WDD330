const links = [
    {
      label: "Week 1 Notes",
      url: "week1/index.html"
    },
    {
        label: "Week 2 Notes",
        url: "week2/index.html"
    },
    {
      label: "Week 3 Notes",
      url: "week3/index.html"
  }
  ]

function populateUl(){
  ol = document.createElement('ol');

  document.getElementById('myItemList').appendChild(ol);

  links.forEach(function (link) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    ol.appendChild(li);
    li.appendChild(a);

    a.innerHTML += link.label;
    a.setAttribute('href', link.url);

  });
};



