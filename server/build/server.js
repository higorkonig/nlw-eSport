import express from "express";
const app = express();
app.use("/ads", (req, res) => {
    return res.send([
        {
            title: "title 1",
        },
        {
            title: "title 2",
        },
        {
            title: "title 2",
        },
    ]);
});
app.listen(3000, () => {
    console.log("On :D");
});
