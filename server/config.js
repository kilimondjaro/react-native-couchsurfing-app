const express = {
  host: 'localhost',
  port: '8080'
};

const mongo = {
  uri: 'mongodb://localhost:27017/dev'
};

const parse = {
  app_id: 'couchsurfing-app',
  master_key: 'c9a5715d-dc46-4b31-84b0-778a87d64f5d',
  file_key: 'f1f33bfd-cb99-4419-bf09-fdc7d4bb39ba'
};

export {
  express,
  mongo,
  parse
};
