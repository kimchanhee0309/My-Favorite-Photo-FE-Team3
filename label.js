import githubLabelSync from "github-label-sync";

githubLabelSync({
  accessToken: process.env.GITHUB_TOKEN,
  repo: "kimchanhee0309/My-Favorite-Photo-FE-Team3",
  labels: [],
  dryRun: true,
}).then((diff) => {
  console.log(diff);
});
///
