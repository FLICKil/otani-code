package my.groupId.encode;

import org.apache.commons.codec.digest.DigestUtils;

public class StringEncode {
  private String encode;

  public StringEncode(String encode) {
    this.encode = encode;
  }

  public String getEncode() {
    return encode;
  }

  public void setEncode(String encode) {
    this.encode = encode;
  }

  public String toEncode() {
    return DigestUtils.md5Hex(this.encode);
  }
}
