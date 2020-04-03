"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetcher_1 = require("./fetcher");
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, category, author } = req.query;
    console.log(req.query);
    let result;
    // if ( category !== 'undefined' ) {
    //   result = await fetchAllPosts(page, category);
    // } else {
    //   result = await fetchAllPosts(page);
    // }
    category !== 'undefined' ? result = yield fetcher_1.fetchAllPosts(page, category) : result = yield fetcher_1.fetchAllPosts(page);
    if (!result) {
        res.set('Access-Control-Allow-Origin', "*");
        res.set('Access-Control-Allow-Methods', 'GET');
        return res.status(404).json({ message: 'no more articles' });
    }
    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'GET');
    res.json(result);
});
const getSinglePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.query;
    if (slug) {
        const result = yield fetcher_1.fetchSinglePostBySlug(slug);
        res.set('Access-Control-Allow-Origin', "*");
        res.set('Access-Control-Allow-Methods', 'GET');
        res.json(result);
    }
    else {
        res.set('Access-Control-Allow-Origin', "*");
        res.set('Access-Control-Allow-Methods', 'GET');
        res.sendStatus(404);
    }
});
module.exports = { getAllPosts, getSinglePost };
