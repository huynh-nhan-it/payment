import React from "react";
import {
  Page,
  Document,
  Text,
  StyleSheet,
  View,
  Font,
  Link,
} from "@react-pdf/renderer";

// Đăng ký font chữ từ Google Fonts
Font.register({
  family: "Markazi Text",
  src: `${process.env.PUBLIC_URL}/font/Markazi_Text/static/MarkaziText-Regular.ttf`,
});

Font.register({
  family: "Markazi Text Bold",
  src: `${process.env.PUBLIC_URL}/font/Markazi_Text/static/MarkaziText-Bold.ttf`,
});
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 20,
    fontSize: 10,
    fontFamily: "Markazi Text",
  },
  title: {
    fontSize: 17,
    marginBottom: 20,
    fontFamily: "Markazi Text Bold",
    textAlign: "center",
  },
  section: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 12, // Điều chỉnh kích cỡ chữ tại đây
  },
  table: {
    marginTop: 20,
    marginBottom: 10,
    width: "100%",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
  },
  tableHeader: {
    backgroundColor: "#9DB2BF",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12, // Điều chỉnh kích cỡ chữ tại đây
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    fontSize: 12, // Điều chỉnh kích cỡ chữ tại đây
  },
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: "#000",
    borderRightStyle: "solid",
  },
  sectionChild: {
    width: "50%",
  },
  totalPayment: {},
  componnent: {
    marginTop: 10,
  },
  titleChild: {
    fontSize: 15,
    fontFamily: "Markazi Text Bold",
  },
  line: {
    width: "100%", // Độ dài của dòng kẻ
    borderBottomWidth: 1,
    borderBottomColor: "#000", // Màu của dòng kẻ
    borderBottomStyle: "solid",
  },
  value: {
    fontSize: 11,
  },
});

// Create Document Component
const DetailRequestPDF: React.FC = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>PAYMENT REQUEST</Text>

      <View style={styles.section}>
        <View style={styles.sectionChild}>
          <Text style={styles.section}>
            <Text style={styles.label}>Created by:</Text>
            <Text style={styles.value}>1</Text>
          </Text>
          <Text style={styles.section}>
            <Text style={styles.label}>Created at:</Text>
            <Text style={styles.value}>1</Text>
          </Text>
          <Text style={styles.section}>
            <Text style={styles.label}>PO/PR number:</Text>
            <Text style={styles.value}>1</Text>
          </Text>
        </View>
        <View style={styles.sectionChild}>
          <Text style={styles.section}>
            <Text style={styles.label}>Department:</Text>
            <Text style={styles.value}>1</Text>
          </Text>
          <Text style={styles.section}>
            <Text style={styles.label}>Purpose:</Text>
            <Text style={styles.value}>1</Text>
          </Text>
          <Text style={styles.section}>
            <Text style={styles.label}>Supplier:</Text>
            <Text style={styles.value}>1</Text>
          </Text>
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text
            style={[styles.tableHeader, styles.tableCell, styles.borderRight]}
          >
            Tiêu đề
          </Text>
          <Text
            style={[styles.tableHeader, styles.tableCell, styles.borderRight]}
          >
            Nội dung
          </Text>
          <Text
            style={[styles.tableHeader, styles.tableCell, styles.borderRight]}
          >
            Nội dung
          </Text>
          <Text
            style={[styles.tableHeader, styles.tableCell, styles.borderRight]}
          >
            Nội dung
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.borderRight]}>Tiêu đề 1</Text>
          <Text style={[styles.tableCell, styles.borderRight]}>Nội dung 1</Text>
          <Text style={[styles.tableCell, styles.borderRight]}>Nội dung 1</Text>
          <Text style={[styles.tableCell, styles.borderRight]}>Nội dung 1</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.borderRight]}>Tiêu đề 2</Text>
          <Text style={[styles.tableCell, styles.borderRight]}>Nội dung 1</Text>
          <Text style={[styles.tableCell, styles.borderRight]}>Nội dung 1</Text>
          <Text style={[styles.tableCell, styles.borderRight]}>Nội dung 1</Text>
        </View>

        {/* Thêm các hàng tương tự cho các tiêu đề và nội dung khác */}
      </View>

      <View style={[styles.section, styles.componnent]}>
        <View style={styles.sectionChild}>
          <Text style={styles.section}>
            <Text style={styles.label}>Tổng tiền trước thuế: </Text>
            <Text style={styles.value}>31,231</Text>
          </Text>
          <Text style={styles.section}>
            <Text style={styles.label}>Thuế GTGT: </Text>
            <Text style={styles.value}>0</Text>
          </Text>
          <Text style={styles.section}>
            <Text style={styles.label}>Tổng tiền thanh toán: </Text>
            <Text style={styles.value}>31,231</Text>
          </Text>
        </View>
        <View style={styles.sectionChild}>
          <Text style={styles.section}>
            <Text style={styles.label}>Số tiền đề nghị: </Text>
            <Text style={styles.value}>31,231</Text>
          </Text>
          <Text style={styles.section}>
            <Text style={styles.label}>Số tiền đã tạm ứng từ Công ty: </Text>
            <Text style={styles.value}>0</Text>
          </Text>
          <Text style={styles.section}>
            <Text style={styles.label}>
              Số tiền Công ty trả thêm cho Nhà cung cấp/Nhân viên:{" "}
            </Text>
            <Text style={styles.value}>31,231</Text>
          </Text>
        </View>
      </View>

      <View style={[styles.section, styles.componnent]}>
        <View style={styles.sectionChild}>
          <Text style={styles.section}>
            <Text style={styles.label}>Tỉ giá sử dụng: </Text>
          </Text>
          <Text style={styles.section}>
            <Text style={styles.label}>Ngoại tệ: </Text>
            <Text style={styles.value}>VND(đ)</Text>
          </Text>
          <Text style={styles.section}>
            <Text style={styles.label}>Tỷ giá: </Text>
            <Text style={styles.value}>1</Text>
          </Text>
        </View>
        <View style={styles.sectionChild}>
          <Text style={styles.section}>
            <Text style={styles.label}>Ghi chú:</Text>
          </Text>
          <Text>
            <Text style={styles.label}>
              1. Đề nghị thanh toán chỉ có hiệu lực khi có Trưởng bộ phận của
              người đề nghị thanh toán ký xác nhận và người có thẩm quyền phê
              duyệt chi phí theo "Bảng thẩm quyền ký duyệt - MCH".
            </Text>
          </Text>
          <Text>
            <Text style={styles.label}>
              2. Phân bổ ngành hàng: Nếu xác định được chi phí đến từng ngành
              hàng, nhãn hàng, chủng loại sản phẩm thì cần ghi rõ để hạch toán
              đúng ngành hàng, nhãn hàng, chủng loại sản phẩm đó.
            </Text>
          </Text>
        </View>
      </View>

      <View style={[styles.section, styles.componnent]}>
        <View style={styles.sectionChild}>
          <Text style={styles.section}>
            <Text style={styles.label}>Note: Đề nghị thanh toán bằng </Text>
            <Text style={styles.value}> </Text>
            <Text style={styles.value}> </Text>

            <Text style={styles.value}>Cash</Text>
          </Text>
        </View>
        <View style={styles.sectionChild}>
          <Text style={styles.section}>
            <Text style={styles.label}>Chuyển khoản vào tài khoản số: </Text>
          </Text>
          <Text style={styles.section}>
            <Text style={styles.label}>Tại Ngân hàng: </Text>
          </Text>
          <Text style={styles.section}>
            <Text style={styles.label}>Tên người thụ hưởng: </Text>
          </Text>
        </View>
      </View>
      <Text style={styles.titleChild}>Related document</Text>
      <View>
        <View style={styles.line}></View>
        <View style={styles.section}>
          <Text>Wed, 09 Aug 2023 00:04:55 +07:00</Text>
          <Link src="">test-1.c </Link>
          <Text>Bang Nguyen Minh</Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.section}>
          <Text>Wed, 09 Aug 2023 00:04:55 +07:00</Text>
          <Link src="">test-1.c </Link>
          <Text>Bang Nguyen Minh</Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.section}>
          <Text>Wed, 09 Aug 2023 00:04:55 +07:00</Text>
          <Link src="">test-1.c </Link>
          <Text>Bang Nguyen Minh</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default DetailRequestPDF;
