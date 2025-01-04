const styles = `
:host{
  all: initial;
}

.button {
  background-color: #1d9bf0;
  color: white;
  text-decoration: none;
  line-height: 0;
  padding: 8px 16px;
  border-radius: 3px;
  font-weight: bold;
  cursor: pointer;
  display: inline-flex;
  font-size: 12px;
  align-items: center;
  justify-content: center;
  border: 1px solid #1d9bf0;
  font-family: 'roboto', sans-serif;
  font-size: 13px;
}

.button svg {
  fill: white;
  margin-right: .25em;
  height: 1.25em;
}

.button:hover {
  background: white;
  color: #1d9bf0;
}

.button:hover svg {
  fill: #1d9bf0;
}

@media (max-width: 512px) {
  .button span.text {
    display: none;
  }
  .button span svg {
    margin: 0;
  }
}`;

class TweetButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = styles;
    this.shadowRoot.append(style);

    const div = document.createElement("div");
    div.className = "button";

    const logo = document.createElement("span");
    logo.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>`;
    div.append(logo);
    this.shadowRoot.append(div);

    const text = document.createElement("span");
    text.textContent = "Share";
    text.className = "text";
    div.append(text);

    const url = `https://twitter.com/intent/tweet?url=${window.location}`;
    this.addEventListener("click", (e) => {
      window.open(url, "_blank").focus();
      e.preventDefault();
    });

    this.title = "Share on twitter";
  }
}

customElements.define("tweet-button", TweetButton);

export { TweetButton };
