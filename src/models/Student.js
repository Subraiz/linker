import md5 from "react-native-md5";

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
    skills,
    liked = [],
    disliked = [],
  ) {
    this.uid = uid;
    this.name = name;
    this.email = email;
    this.phone = phone || "5555555555";
    this.image = image;
    this.school = school || "Some College";
    this.major = major || "Undeclared";
    this.gpa = gpa || 0.0;
    this.about = about || "I am " + this.name + " and I am a " + this.major + " major at " + this.school + ".";
    this.skills = skills || [];
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
    return this.phone || "5555555555";
  }

  getImage() {
    return this.image || this.getGravatarUri(this.getEmail());
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

export const toObject = () => {
  return {
    uid: this.getUid(),
    name: this.getName(),
    email: this.getEmail(),
    phone: this.getPhone(),
    image: this.getImage(),
    school: this.getSchool(),
    major: this.getMajor(),
    gpa: this.getGPA(),
    about: this.getAbout(),
    skills: this.getSkills(),
    liked: this.getLiked(),
    disliked: this.getDisliked(),
  };
}

export const createFromObject = (studentObj) => {
  if (!studentObj || !studentObj.uid) {
    console.error("Invalid student object!");
    console.error(studentObj);
    return null;
  }

  return new Student(
    studentObj.uid,
    studentObj.name,
    studentObj.email,
    studentObj.phone,
    studentObj.image,
    studentObj.school,
    studentObj.major,
    studentObj.gpa,
    studentObj.about,
    studentObj.skills,
    studentObj.liked,
    studentObj.disliked
  );
}
