const MaskCharacter = (str, mask, n = 1) => {
  return ("" + str).slice(0, -n).replace(/./g, mask) + ("" + str).slice(-n);
};

const formatPhoneNumber = (value) => {
  if (!value) return value;

  const phoneNumber = value.replace(/[^\d]/g, "");

  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 4) return phoneNumber;

  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }

  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6
  )}-${phoneNumber.slice(6, 10)}`;
};

const transformGraph = (
  userGroups,
  users,
  isOverall = false,
  handleUserImage,
  userId
) => {
  const nodesArr = [],
    linksArr = [],
    ug = userGroups[userId];
  linksByUser(linksArr, ug, userId);
  users.forEach((u) => {
    if (
      isOverall ||
      (ug && (ug.hasOwnProperty(u.user_uid) || userId === u.user_uid))
    ) {
      nodesArr.push({
        id: u.user_uid,
        mass: 1,
        marker: {
          symbol: `url(${handleUserImage(u.images)})`,
          width: 50,
          height: 50,
        },
        name: `${u.first_name} is ${u.role}`,
      });
      if (isOverall) {
        const oug = userGroups[u.user_uid];
        linksByUser(linksArr, oug, u.user_uid);
      }
    }
  });
  return [nodesArr, linksArr];
};

const linksByUser = (linksArr, ug, userId) => {
  if (!ug) return;
  Object.keys(ug).forEach((uk) => {
    if (
      !["origin", "link_uids", "outward_links", "inward_links"].includes(uk)
    ) {
      const linkedUser = ug[uk];
      if (linkedUser["is_outward"]) {
        linksArr.push({
          from: userId,
          to: linkedUser.user_uid,
        });
      }
      if (linkedUser["is_inward"]) {
        linksArr.push({
          from: linkedUser.user_uid,
          to: userId,
        });
      }
    }
  });
};

export { MaskCharacter, formatPhoneNumber, transformGraph };
