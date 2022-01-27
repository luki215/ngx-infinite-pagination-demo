const express = require("express");
const app = express();
const port = 3000;

const total = 10000;

const posts = Array(total)
  .fill(0)
  .map((_, i) => ({
    title: `POST ${i + 1}`,
    content:
      "Voluptatem facilis maxime quaerat veritatis fugiat molestiae blanditiis non. Voluptatem expedita aut consequatur eos temporibus distinctio dolores ipsa cumque. A omnis molestiae culpa numquam sit reiciendis voluptate facere. Ut et similique repudiandae laborum quaerat sunt laboriosam distinctio. Dolorem unde sed praesentium velit et.",
  }));

app.get("/items", (req, res) => {
  const page = req.query.page || 1;
  const per = req.query.per || 10;

  res.set("Access-Control-Allow-Origin", "*");
  res.send({
    data: posts.slice((page - 1) * per, page * per),
    total_pages: total,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
