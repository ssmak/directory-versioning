<h1 align="center">directory-versioning</h1>

<h5 align="center">Version control for your production code.
</h5>
<br />
<div align="center">
  <a href="https://github.com/ssmak/directory-versioning">
    <img src="https://img.shields.io/badge/version-v1.0.0-blueviolet.svg" />
  </a>
  <a href="https://atom.io/packages/snippets-from-gist">
    <img src="https://img.shields.io/badge/env-nodejs-orange.svg" />
  </a>
</div>
<br />

## History
Manager calls a meeting with me and complain that the website is unstable. "Anything updated yesterday?" - ask by the Manager"<br />
The production environment can be complex and not only one person can add, update or delete the content. The result is "I don't know who make the change."
The solution is to make versioning for any repositories that you concern. View and rollback the change on demand.
<br />
<div align="center">
  <a href="https://paypal.me/ssmak">
    <img src="https://img.shields.io/badge/Donate-PayPal-green.svg" alt="PayPal Donation" />
  </a>
  <br />
  <a href="https://paypal.me/ssmak">
    <img src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg" alt="PayPal" />
  </a>
</div>

## Installation + Use
1. Install the npm globally
``` bash
npm install -g directory-versioning
```

2. Locate to the package setting and type your gist repository like this (*Remember* to press -Enter- after edit)
```bash
directory-version --path <PATH_OF_THE_FOLDER> [--d] [--i 10] [--q]
d: Run as dedicated process.
i: Time interval, unit in second(s).
q: Quiet mode.
```

## Test
``` bash
npx mocha
OR
npm test
```

## License
MIT
