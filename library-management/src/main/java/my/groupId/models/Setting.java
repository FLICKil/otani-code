package my.groupId.models;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Setting {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private int userIssuedLimit;
  private int bookReturnDay;
  private String currency;
  private BigDecimal oneDayFee;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
  private Long createdBy;
  private Long updatedBy;

  public Setting() {}

  public Setting(
      Long id,
      int userIssuedLimit,
      int bookReturnDay,
      String currency,
      BigDecimal oneDayFee,
      LocalDateTime createdAt,
      LocalDateTime updatedAt,
      Long createdBy,
      Long updatedBy) {
    this.id = id;
    this.userIssuedLimit = userIssuedLimit;
    this.bookReturnDay = bookReturnDay;
    this.currency = currency;
    this.oneDayFee = oneDayFee;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public int getUserIssuedLimit() {
    return userIssuedLimit;
  }

  public void setUserIssuedLimit(int userIssuedLimit) {
    this.userIssuedLimit = userIssuedLimit;
  }

  public int getBookReturnDay() {
    return bookReturnDay;
  }

  public void setBookReturnDay(int bookReturnDay) {
    this.bookReturnDay = bookReturnDay;
  }

  public String getCurrency() {
    return currency;
  }

  public void setCurrency(String currency) {
    this.currency = currency;
  }

  public BigDecimal getOneDayFee() {
    return oneDayFee;
  }

  public void setOneDayFee(BigDecimal oneDayFee) {
    this.oneDayFee = oneDayFee;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public LocalDateTime getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
  }

  public Long getCreatedBy() {
    return createdBy;
  }

  public void setCreatedBy(Long createdBy) {
    this.createdBy = createdBy;
  }

  public Long getUpdatedBy() {
    return updatedBy;
  }

  public void setUpdatedBy(Long updatedBy) {
    this.updatedBy = updatedBy;
  }
}
