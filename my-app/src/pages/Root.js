import RootLayout from "../components/RootLayout";

function Root() {
  return <RootLayout />;
}

export default Root;

export async function loader({ request }) {
  let href;
  if (request.url.includes("searchUrl")) {
    const url = new URL(request.url);
    let searchUrl = url.searchParams.get("searchUrl");
    let where = url.searchParams.get("where");
    let limit = url.searchParams.get("limit");
    href = `https://${searchUrl}?where=${where}&limit=${limit}`;
  } else if (request.url.includes("submitUrl")) {
    const url = new URL(request.url);
    let submitUrl = url.searchParams.get("submitUrl");
    let where = url.searchParams.get("where");
    let limit = url.searchParams.get("limit");
    href = `https://${submitUrl}&where=${where}&limit=${limit}`;
  } else {
    href =
      "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/airbnb-listings/records?select=id%2C%20xl_picture_url%2C%20host_name%2Cproperty_type%2C%20geolocation%2C%20summary%2C%20accommodates%2C%20review_scores_rating%2C%20price&limit=40";
  }
  const res = await fetch(href);
  const data = await res.json();
  const results = data.results;
  console.log(results);

  let resource = await Promise.all(
    results.map(async (data) => {
      if (!data.xl_picture_url) {
        return;
      }
      const active_picture = await fetch(data.xl_picture_url);
      if (!active_picture.ok) {
        return;
      }
      return { ...data };
    })
  );

  resource = resource.filter((v) => v);
  const storeResources = resource.map((v) => {
    return { id: v.id, count: 0, favorite: false };
  });
  return { results: resource, storeResources };
}
