1. Folder DTO
Đối tượng DTO sẽ nhận các dữ liệu mà người dùng nhập vào trên giao diện, sau đó sẽ chuyển đổi thành model / entity tương ứng, để thực hiện các API thêm-sửa-xóa vào database.

2. Folder Entityr
Đối tượng Entity định nghĩa các table trong database .

3. Folder Model
Dùng Model để thực hiện giải quyết logic, hiển thị thông tin lên màn hình,..

4. Folder Context
Sau khi định nghĩa table trong Entity, vào đây để định nghĩa DbSet và tạo bảng, update xuống database.

5. Folder Repository
Thực hiện các logic (đơn giản: mapping, CRUD,..) để controller gọi.

6. Folder Service
Thực hiện các logic, nghiệp vụ,... phức tạp hơn. Cũng để controller gọi.


# Các bước để thiết lập backend:

 Bước 1: Mở dự án và vào phần Package Manager Console thực hiện Migration: 

Điều đầu tiên cần làm là thiết lập đường dẫn database đến thư mục dự án, trước tiên hãy truy cập vào dự án, sau đó truy cập vào file appsettings.json, ở đó bạn sẽ thấy một thuộc tính là "ConnectionStrings", hãy điều chỉnh đường dẫn database của bạn ở đây rồi thực hiện các lệnh.

Lệnh 1: add-migration initdb (Nếu đã có thư mục Migration rồi thì không thực hiện bước này)
Lệnh 2: update-database

Sau khi đã hoàn thành các bước trên hãy vào database kiểm tra và import file sql dược cung cấp để có thể sử dụng dự án.

