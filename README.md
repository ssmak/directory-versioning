<h1 align="center">directory-versioning</h1>

<h5 align="center">Make versioning for directory with Git.</h5>
<br />
<div align="center">
  <a href="https://github.com/ssmak/directory-versioning">
    <img src="https://img.shields.io/badge/version-v1.0.4-blueviolet.svg" />
  </a>
  <a href="https://www.npmjs.com/package/directory-versioning">
    <img src="https://img.shields.io/badge/env-nodejs-orange.svg" />
  </a>
</div>
<br />
<a href="https://nodei.co/npm/directory-versioning/"><img src="https://nodei.co/npm/directory-versioning.png?compact=true"></a>
<br />

## History
Manager calls a meeting with me and complain that the website is unstable. "Anything updated yesterday?" - ask by the Manager"<br />
The production environment can be complex and not only one person can add, update or delete the content. The result is "I don't know who make the change."<br />
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

2. Start versioning for directory
```bash
directory-versioning --path <PATH_OF_THE_FOLDER> [--d] [--i 10] [--q]
```
d: Run as long run process.<br />
i: Time interval, unit in second(s).<br />
q: Quiet mode.

## Test
``` bash
npx mocha
OR
npm test
```

## License
MIT
