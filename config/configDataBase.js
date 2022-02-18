export default {
  mongoDB: {
    uri: `mongodb+srv://gonzalo:${process.env.MONGO_PASS}@${process.env.MONGO_DATABASE}.1bu3e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  },
  fireBase: {
    type: "service_account",
    project_id: "coderhouse-backend-98953",
    private_key_id: "195f3da9198b0f801df7ee98fa6eac898df9d0f6",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDm+a56iBesWLNc\npPwonNyoRZ7X+hg55MePb7jAky1LmhzLJ9Ti/3F+n7yCnHJ0Tc5/RmGPw5NQvtgs\nsTVtG1BBK9XthIdNswHImYpgTeICm/tMz0+WdTXPxhGv4v6I+KehIF7RelslRjTB\nGj8XYwD9an/jMlorZsqV+0QHIJupA7zXrKX4eOO3bBmlCdMkjEiqzoYtaXBxuK1k\n3r+CHl2xhQRNO2oYtbmLoKlBaSkdJawPJnoQvPY/fjCElLY2HP1Z/09KI47pSHdk\nO46QrJtFuEcz3/lIIcNjrckHplUY5nhvYM1oiY0yYnapp5VwQ9lahf2ReVjf+b0t\nBg/QiajbAgMBAAECggEAANTJb6GTDImZGHLyuQnEndX0BIO8iEnHKfPswisB7PG8\nmg8L2d+cX8rqMwKD3iNWkWJb0BFiaonTMkd9XSvarTZFZ0nYwEzEgig1nTv5LBH/\nFZbxWUpkt3I5TTSDs/0l5T/6VRblhzc8WXDTugcvL2mbRPF0pGVq+omJ+8rimvkq\nu3jCsw4bqu/ml8zHs0mbufHGwM99dEbFWckAduCD6nqz1GKsFqw1lbJRJTW7uKEC\ny088xA+byXEgY/snWciLdTIQgEUOyrjmh7OUUvdWTR+HgseSOx6Pb9jIsSS7raTr\nG72lhp5lDq+4JGaDUgucTJxgxnRzTI1lxQtz6hzORQKBgQD2/JFsPWx569W0j3NX\ncQZjsWyDpezfq5plUmZuCxorbd7Tztw02VWmgT7aJcrhkpwxo+yF7258VT5cf1e6\n/EiTrvep/4O6MjgM9YmZzpjADpVSn6ClNJpd4fqwNtzL5l7SSlYyJrifsbiCdQfl\ncAfAHdsge8quuUxDNKnou6GJnQKBgQDvZ4fgsLxagRA1HFyNWdoSLF6C+t19o7o/\nycpITTY00vq3VTauk7jy22v0e0QYyIVszu+aubsv/VpB2r5AbkTPlPkBrk8Q4K6Y\np4pKb/Dw1LUqKTxgFUde6rVhfhTnhPOt4CzpDvVntOrNbFMdP/kn2d8SN2tsZBED\nF79Q3pKO1wKBgQDbqubsDfVcupPnc25yZuP35uVMcVar2EQJua/AT7+GwMFeQK05\nk9LJtEniW5qF5Y9l1xWWSc1KZ8Z/HgM5Gwix0PwVBlxyThfr7rXjRgw1RMMqKS8H\nwDFLLqF3+FOIRewvvE3NbQLnhXlFDjFnrqw2AlfSHEe3/rYFT+GOTNLvQQKBgFt3\nc7uN6ritXNLd3iKHNMECwK1MSXlqJ4udfjJ3hYFTJkULQpQajmwDF1DWE6NgYVG8\nEmFMGs9v/Z7xgwS83H9uzGAvB7hMD4j1YemksSpiKkFMdevD1XvXMqtn73axHiTN\nZHs6otoXjioj+/FN8tSd8hNUpy9HYBSNayPrlZULAoGBAMPKXT+amkNfQ5AtnK57\nCXIWDH0BYJ7vHSF/hRf+0LWGCc7PjoD+x3CtnAJD9cdAcZ4UKtWb3xTVsoaUIpRP\nlSSz/tcbq7p1C5OmJ9yEz8JNZt5tQhOekLTQLNIdy5yi1zPr22dDlZ401DvOF1h0\nl/F+wuESNokRfERAl3jRQfKf\n-----END PRIVATE KEY-----\n",
    client_email:
      "firebase-adminsdk-1hp73@coderhouse-backend-98953.iam.gserviceaccount.com",
    client_id: "115131352880881675495",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1hp73%40coderhouse-backend-98953.iam.gserviceaccount.com",
  },
};
