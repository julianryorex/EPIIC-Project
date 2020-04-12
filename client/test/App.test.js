import React from "react";
import ReactDom from "react-dom";
import { act } from "react-dom/test-utils";
import { expect } from "chai";
let jsdom = require("mocha-jsdom");

global.document = jsdom({
    url: "httlp://localhost:3000/"
});

import App from "../src/App";

let rootContainer;

beforeEach(() => {
    rootContainer = document.createElement("div");
    document.body.appendChild(rootContainer);
});

afterEach(() => {
    document.body.removeChild(rootContainer);
    rootContainer = null;
});

describe("Testing Root App.js", () => {
    it("Renders")
})