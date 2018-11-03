export default class Recruiter {
  constructor(
    uid,
    name,
    email,
    phone,
    image,
    companyName,
    companyAddress,
    companyDescription,
    industry,
    positionsAvailable
  ) {
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.image = image;
    this.companyName = companyName;
    this.companyAddress = companyAddress;
    this.companyDescription = companyDescription;
    this.industry = industry;
    this.positionsAvailable = positionsAvailable;
    this.liked = [];
    this.disliked = [];
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
    return this.image;
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
