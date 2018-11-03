import Student from "./Student";
import Recruiter from "./Recruiter";

export const Database = {
  getNextRecruiter: (student) => {
    // TODO
    return new Recruiter("def456", "David Shen R", "davi@d-shen.xyz", "6178637436", "IMAGE", "Google", "1600 Amphitheatre Parkway Mountain View, CA", "A cool company", "Technology", ["Software Engineer", "UI/UX Engineer", "Backend Engineer"]);
  },

  getNextStudent: (recruiter) => {
    // TODO
    console.log("get next");
    let student = new Student("123abc", "David Shen S", "davi@d-shen.xyz", "6178637436", "IMAGE", "Boston College", "Computer Science", 3.8, "I'm a student", "None");
    return student;
  }
}
