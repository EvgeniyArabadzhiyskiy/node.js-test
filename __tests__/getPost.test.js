const { getPost } = require("../src/services/postService");
const { Posts } = require("../src/db/postModel");

// const posts = await Posts.find({ owner });
//    const result = posts.populate("owner", {__v: 0, password: 0, token: 0});

test("Post Service getPost", async () => {
  const mOwner = "33";
  //   const mLimit = 5;
  //   const mSkipPost = 15;

//   const posts = [{
//     _id: "9",
//     topics: "top",
//     text: "text",
//     owner: mOwner,
//     createAt: Date.now(),
//   }];



  const posts = [{
    _id: "9",
    topics: "top",
    text: "text",
    owner: {_id: mOwner, name: 'Djon', createAt: Date.now()},
    createAt: Date.now(),
  }];

  jest.spyOn(Posts, "find").mockImplementation(() => posts)
  
  const result = await getPost(mOwner);


//   expect(result[0].owner).toEqual(mOwner);
  expect(result[0].topics).toBeDefined();
  expect(result[0].text).toBeDefined();
});
