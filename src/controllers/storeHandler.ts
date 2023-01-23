export function UrlConstructor(query: any) {
  let url = 'https://fakestoreapi.com/products';
  if (query.category) {
    url += `/category/${query.category}`;
  }

  if (query.sort || query.limit) {
    url += '/?';
    if (query.sort) {
      url += `&sort=${query.sort === 'up' ? 'asc' : 'desc'}`;
    }
    if (query.limit) {
      url += `&limit=${query.limit}`;
    }
  }
  console.log(url);

  return url;
}
