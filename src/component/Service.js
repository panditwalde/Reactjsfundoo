import axios from "axios";

export function UserRegistration(regDto) {
  return axios.post("http://localhost:8080/register", regDto, {
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    }
  });
}

export function userLogin(logindto) {
  return axios.post("http://localhost:8080/login", logindto, {
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    }
  });
}

export function forgotPassword(email) {
  return axios.post(
    "http://localhost:8080/forgotpassword",
    {},
    {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        email: email
      }
    }
  );
}

export function setNewPassword(token, setnewassword) {

  
  
  return axios.post("http://localhost:8080/setNewPassword", setnewassword, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      token: token
    }
  });
}
export function chanageprofile(file, token) {
  return axios.post("http://localhost:8080/addprofile", file, {
    headers: {
      "Content-Type": "multipart/form-data",
      token: token
    }
  });
}

export function deleteNote(noteid, token) {
  return axios.delete(`http://localhost:8081/deletenote?noteid=${noteid}`, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      token: token
    }
  });
}

export function createNote(notedto, token) {
     console.log(notedto.collabrator);
     
  return axios.post("http://localhost:8081/createnote", notedto, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      token: token
    }
  });
}

export function DisplayAllNotes(token) {
  return axios.get("http://localhost:8081/getallnote", {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      token: token
    }
  });
}

export function editNote(notedto, noteid, token) {
  return axios.put("http://localhost:8081/editnote", notedto, {
    params: {
      noteid: noteid
    },
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      token: token
    }
  });
}

export function addIntrash(noteid, token) {
  return axios.put(
    "http://localhost:8081/trash",
    {},
    {
      params: {
        noteid: noteid
      },

      headers: {
        "Content-Type": "application/json; charset=utf-8",
        token: token
      }
    }
  );
}

export function addInArchive(noteid, token) {
  return axios.put(
    "http://localhost:8081/archive",
    {},
    {
      params: {
        noteid: noteid
      },

      headers: {
        "Content-Type": "application/json; charset=utf-8",
        token: token
      }
    }
  );
}

export function setColor(noteid, colorCode, token) {
  return axios.put(
    "http://localhost:8081/setcolor",
    {},
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        noteid: noteid,
        colorCode: colorCode,
        token: token
      }
    }
  );
}

export function searchNote(note) {
  let token = localStorage.getItem("Token");

  return axios.get(
    "http://localhost:8081/searchnote",

    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        note: note,
        token: token
      }
    }
  );
}
export function addLabel(label, token) {
  return axios.post("http://localhost:8081/addlabel", label, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      token: token
    }
  });
}
export function addLabelWithnote(labeldto, token) {
  console.log(labeldto.lable_title);

  console.log(labeldto.noteid);

  return axios.post("http://localhost:8081/addlabelwithnote", labeldto, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      token: token
    }
  });
}

export function DisplayAllLabel(token) {
  return axios.get("http://localhost:8081/getalllabel", {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      token: token
    }
  });
}

export function deletelabel(labelid, token) {
  console.log("id" + labelid);
  console.log("token" + token);

  return axios.delete(`http://localhost:8081/deletelabel?labelid=${labelid}`, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      token: token
    }
  });
}

export function editLabel(label_title, label_id, token) {
  console.log(label_title);
  console.log(label_id);
  console.log(token);

  return axios.put(
    `http://localhost:8081/updatelabel?label_id=${label_id}&label_title=${label_title}`,
    null,
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        token: token
      }
    }
  );
}

export function addReminder(date, noteid, token) {
  console.log(date);
  console.log(noteid);
  console.log();

  return axios.put(
    `http://localhost:8081/addreminder?date=${date}&noteid=${noteid}`,
    null,
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        token: token
      }
    }
  );
}

export function removeReminder(noteid, token) {
  console.log(noteid);
  console.log(token);

  return axios.delete(`http://localhost:8081/removereminder?noteid=${noteid}`, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      token: token
    }
  });
}

export function addCollabrator(collabraotoremail, noteid, token) {
  console.log(collabraotoremail);
  console.log(noteid);

  return axios.put(
    `http://localhost:8081/addCollabrator?collabraotoremail=${collabraotoremail}&noteid=${noteid}`,
    null,
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        token: token
      }
    }
  );
}

export function removeCollabrator(email, noteid, token) {
  console.log("e" + email);
  console.log("n" + noteid);
  console.log(token);

  return axios.delete(
    `http://localhost:8081/removeCollabrator?email=${email}&noteid=${noteid}`,

    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        token: token
      }
    }
  );
}

export function pinUnpin(token, noteid) {
  return axios.put(
    "http://localhost:8081/pinunpin",
    {},
    {
      params: {
        noteid: noteid
      },

      headers: {
        "Content-Type": "application/json; charset=utf-8",
        token: token
      }
    }
  );
}

export function labelWithNote(labelid, token) {
  console.log("id" + labelid);
  console.log("token" + token);

  return axios.get(`http://localhost:8081/labelwithnote?labelid=${labelid}`, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      token: token
    }
  });
}


export function updateLabelWithNote(labelid,noteid,token) {
  console.log("label id" + labelid);
  console.log("noteid id" + noteid);
  console.log("token" + token);

  return axios.put(`http://localhost:8081/UpdatelabelWithNotes?labelid=${labelid}&noteid=${noteid}&token=${token}`, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      token: token
    }
  });
}