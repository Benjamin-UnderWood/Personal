{
  let {href, protocol, host, hostname,
       port, pathname, search, hash, origin} = window.location;

  console.log({href, protocol, host, hostname,
             port, pathname, search, hash, origin});
}

{
  let url = document.createElement('a');

  url.href = "http://localhost:8080?q=abc#def";

  let {href, protocol, host, hostname,
       port, pathname, search, hash, origin} = url;

  console.log({href, protocol, host, hostname,
             port, pathname, search, hash, origin});
}
