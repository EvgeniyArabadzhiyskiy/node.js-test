const { getPostById } = require("../src/services/postService");
const { Posts } = require("../src/db/postModel");

test("Post Service getPostById", async () => {
  const mPostId = "1";
  const mOwner = "33";

  const post = {
    _id: mPostId,
    topics: "top",
    text: "text",
    owner: mOwner,
    createAt: Date.now(),
  };

  jest.spyOn(Posts, "findOne").mockImplementation(() => post);

  // Posts["findOne"] = jest.fn(() => post);

  const result = await getPostById(mPostId, mOwner);

  expect(result._id).toEqual(mPostId);
  expect(result.owner).toEqual(mOwner);
  expect(result.topics).toBeDefined();
  expect(result.text).toBeDefined();
});
