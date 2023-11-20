export async function GET() {
  //   const gNews = await fetch(
  //     `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=10&apikey=${process.env.GNEWS_API_KEY}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       return data;
  //     });
  const mediaStack = await fetch(
    `http://api.mediastack.com/v1/news?access_key=${process.env.MEDIA_STACK_API_KEY}&sources=business,-sports`
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  return Response.json(mediaStack);
}
