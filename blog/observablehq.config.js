// See https://observablehq.com/framework/config for documentation.
export default {
  // The app’s title; used in the sidebar and webpage titles.
  title: "blog",

  // The pages and sections in the sidebar. If you don’t specify this option,
  // all pages will be listed in alphabetical order. Listing pages explicitly
  // lets you organize them into sections and have unlisted pages.
  pages: [
    {
      name: "Modern  C++",
      pages: [
        {name: "Dashboard", path: "/example-dashboard"},
        {name: "Report", path: "/example-report"}
      ]
    },
    {
      name: "Geospatial HD Mapping",
      pages: [
        {name: "Dashboard", path: "/maps/open-street-maps"},
        {name: "Report", path: "/maps/"}
      ]
    },
    {
      name: "Simulation with Unreal Engine",
      pages: [
        {name: "Dashboard", path: "/simulation/reinforcement-learning"},
        {name: "Report", path: "/simulation/reinforcement-learning"}
      ]
    },
    {
      name: "Computer Vision",
      pages: [
        {name: "Dashboard", path: "/perception/object-detection"},
        {name: "Report", path: "/perception/scene-understanding"},
        {name: "Report", path: "/perception/semantic-segmentation"},

      ]
    },
    {
      name: "Devops",
      pages: [
        {name: "Dashboard", path: "/devops/terraform"},
        {name: "Report", path: "/devops/docker"},
        {name: "Report", path: "/devops/shell-scripting"},
      ]
    },

    {
      name: "Robotics",
      pages: [
        {name: "Dashboard", path: "/robotics/robot-control"},
        {name: "Report", path: "/robotics/robot-control"}
      ]
    },

    {
      name: "Data Visualization",
      pages: [
        {name: "Dashboard", path: "/data-vis/capacity-planning"},
        {name: "Report", path: "/data-vis/anomaly-detection"},
        {name: "Report", path: "/data-vis/systems-design"},
        {name: "Report", path: "/data-vis/crisis-diagnosis"},
      ]
    }
  ],

  // Content to add to the head of the page, e.g. for a favicon:
  head: '<link rel="icon" href="observable.png" type="image/png" sizes="32x32">',

  // The path to the source root.
  root: "src",

  // Some additional configuration options and their defaults:
  // theme: "default", // try "light", "dark", "slate", etc.
  // header: "", // what to show in the header (HTML)
  // footer: "Built with Observable.", // what to show in the footer (HTML)
  // sidebar: true, // whether to show the sidebar
  // toc: true, // whether to show the table of contents
  // pager: true, // whether to show previous & next links in the footer
  // output: "dist", // path to the output root for build
  // search: true, // activate search
  // linkify: true, // convert URLs in Markdown to links
  // typographer: false, // smart quotes and other typographic improvements
  // preserveExtension: false, // drop .html from URLs
  // preserveIndex: false, // drop /index from URLs
};
