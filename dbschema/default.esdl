module default {
  type Url {
    required property shortUrl -> str {
      constraint exclusive;
    }
    required property fullUrl -> str;
    required property createdAt -> datetime {
      default := datetime_current();
    }
  }
}