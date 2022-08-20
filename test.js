const fs = require("fs").promises;

async function getPromise() {
  const files = await fs.readdir(__dirname);

  const result = await Promise.all(
    files.map(async (file) => {
      const stat = await fs.stat(file);

      return { Name: file, Size: stat.size, Data: stat.mtime };
    })
  );

  console.table(result);
}


getPromise();

// npm run te
