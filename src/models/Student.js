export default class Student {
  constructor(
    uid,
    name,
    email,
    phone,
    image,
    school,
    major,
    gpa,
    about,
    skills
  ) {
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.image = image;
    this.school = school;
    this.major = major;
    this.gpa = gpa;
    this.about = about;
    this.skills = skills;
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

  getSchool() {
    return this.school;
  }

  getMajor() {
    return this.major;
  }

  getGPA() {
    return this.gpa;
  }

  getAbout() {
    return this.about;
  }

  getSkills() {
    return this.skills;
  }

  liked(uid) {
    this.liked.push(uid);
  }

  disliked(uid) {
    this.disliked.push(uid);
  }
}
