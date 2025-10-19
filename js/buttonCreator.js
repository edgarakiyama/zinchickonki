const urlX = 'https://x.com/zchick_key';
const urlIg = 'https://www.instagram.com/zchick_key';
const urlTicket = 'https://trkr.jp/ticket?p=zinchikonki';
const urlMail = 'mailto:zinchick2026uma@gmail.com';

const pcButtonId = {
  ticket: 'botan_x5F_01',
  ig: 'botan_x5F_03',
  x: 'botan_x5F_04',
  mail: 'botan_x5F_02',
};

const spButtonId = {
  ticket: 'botan_x5F_01',
  ig: 'botan_x5F_03',
  x: 'botan_x5F_04',
  mail: 'botan_x5F_02',
};

export default function setLinkButtons(isSp) {
    return;
  const idNames = isSp ? spButtonId : pcButtonId;
  const ticket = document.getElementById(idNames.ticket);
  createLinkElement(ticket, urlTicket);

  const mail = document.getElementById(idNames.mail);
  createLinkElement(mail, urlMail);

  const ig = document.getElementById(idNames.ig);
  createLinkElement(ig, urlIg);

  const x = document.getElementById(idNames.x);
  createLinkElement(x, urlX);
}

function createLinkElement(targetElement, url) {
  const linkElement = document.createElement('a');
  linkElement.href = url;
  targetElement.parentNode.insertBefore(linkElement, targetElement);
  linkElement.appendChild(targetElement);
}
