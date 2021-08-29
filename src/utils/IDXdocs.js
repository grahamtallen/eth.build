import moment from "moment";

const keccak256 = require("keccak256");

export const BOX_SPACE = "eth_build";

const convertFilename2Hash = (fileName) => {
  return keccak256(fileName).toString("hex");
};

export const getDocumentInfo = async (space, fileName) => {
  let key = convertFilename2Hash(fileName);
  let metadata = await space.private.getMetadata(key);
  console.log({ metadata });
  let document = await space.private.get(key);
  console.log({ document });
  let log = await space.private.log();
  let versions = log.filter((entry) => entry.key === key);
  console.log({ log, versions });
  return { document, metadata, versions };
};

export const saveDocument = async (space, fileName, content, screenshot) => {
  const family = space; // ceramic uses the concept of 'family' to namespace documents
  console.log({ space, fileName, document, screenshot });
  // const id = await TileDocument.create(ceramic, content, { family });
};

export const loadDocuments = async (space) => {
  console.log("LOADING DOCUMENTS");
  let files = await space.private.all({ metadata: true });
  console.log(files);
  let documents = Object.values(files).map((file) => ({
    timestamp: file.timestamp,
    timestampStr: moment.unix(file.timestamp).fromNow(),
    ...file.value,
  }));
  documents.sort((fileA, fileB) => fileB.timestamp - fileA.timestamp);
  console.log(documents);
  return documents;
};
