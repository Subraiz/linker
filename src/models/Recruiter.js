import md5 from "react-native-md5";

export default class Recruiter {
  constructor(
    uid,
    name,
    email,
    phone = "5555555555",
    image,
    companyName = "Some Company",
    companyAddress = "Some Address",
    companyDescription,
    industry = "General",
    positionsAvailable = ["Employee"],
    liked = [],
    disliked = [],
  ) {
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.phone = phone || "5555555555";
    this.image = image;
    this.companyName = companyName || "Some Company";
    this.companyAddress = companyAddress || "Some Address";
    this.industry = industry || "General";
    this.companyDescription = companyDescription || "I am " + this.name + " and I am a recruiter from " + this.companyName + ", a company in the " + this.industry + " industry.";
    this.positionsAvailable = positionsAvailable || ["Employee"];
    this.liked = liked;
    this.disliked = disliked;
  }

  getGravatarUri(email) {
    return "https://www.gravatar.com/avatar/" + md5.hex_md5(email.toLowerCase().trim()) + "?s=300";
  }

  getUid() {
    return this.uid;
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

  getPhone() {
    return this.phone;
  }

  getImage() {
    return this.image || this.getGravatarUri(this.getEmail());
  }

  getCompanyName() {
    return this.companyName;
  }

  getCompanyAddress() {
    return this.getCompanyAddress;
  }

  getCompanyDescription() {
    return this.companyDescription;
  }

  getIndustry() {
    return this.industry;
  }

  getPositions() {
    return this.positionsAvailable;
  }

  liked(uid) {
    this.liked.push(uid);
  }

  disliked(uid) {
    this.disliked.push(uid);
  }
}

export const toObject = () => {
  return {
    uid: this.getUid(),
    name: this.getName(),
    email: this.getEmail(),
    phone: this.getPhone(),
    image: this.getImage(),
    companyName: this.getCompanyName(),
    companyAddress: this.getCompanyAddress(),
    companyDescription: this.getCompanyDescription(),
    industry: this.getIndustry(),
    positionsAvailable: this.getPositionsAvailable(),
    liked: this.getLiked(),
    disliked: this.getDisliked(),
  };
}

export const createFromObject = (recruiterObj) => {
  if (!recruiterObj || !recruiterObj.uid) {
    console.log("Invalid recruiter object!");
    console.log(recruiterObj);
    console.log(recruiterObj.uid);
    return null;
  }

  return new Recruiter(
    recruiterObj.uid,
    recruiterObj.name,
    recruiterObj.email,
    recruiterObj.phone,
    recruiterObj.image,
    recruiterObj.companyName,
    recruiterObj.companyAddress,
    recruiterObj.companyDescription,
    recruiterObj.industry,
    recruiterObj.positionsAvailable,
    recruiterObj.liked,
    recruiterObj.disliked
  );
}
