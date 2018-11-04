import Student from "./Student";
import Recruiter from "./Recruiter";

let i = 0;

export const Database = {
  getNextRecruiter: (student) => {
    // TODO
    return new Recruiter("def456", "David Shen R", "davi@d-shen.xyz", "6178637436", "IMAGE", "Google", "1600 Amphitheatre Parkway Mountain View, CA", "A cool company", "Technology", ["Software Engineer", "UI/UX Engineer", "Backend Engineer"]);
  },

  getNextStudent: (recruiter) => {
    // TODO
    if (i == 15) return null;
    let student = new Student("123abc" + i, "David Shen S" + (i++), "davi@d-shen.xyz", "6178637436", "", "Boston College", "", 3.8, "", []);
    return student;
  }
}
