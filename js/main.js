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
    },
    {
      label: "Week 4 Notes",
      url: "week4/index.html"
    },
    {
      label: "Week 5 Notes",
      url: "week5/index.html"
    },
    {
      label: "Week 7 Notes",
      url: "week7/index.html"
    },
    {
      label: "Week 8 Notes",
      url: "week8/index.html"
    },
    {
      label: "Week 9 Notes",
      url: "week9/index.html"
    },
    {
      label: "Week 10 Notes",
      url: "week10/index.html"
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



