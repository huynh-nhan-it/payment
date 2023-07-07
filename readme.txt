1. Folder DTO
Đối tượng DTO sẽ nhận các dữ liệu mà người dùng nhập vào trên giao diện, sau đó sẽ gáng lại vào model / entity, để thêm-sửa-xóa vào database

2. Folder Entity
Đối tượng Entity định nghĩa các table trong database .

3. Folder Model
Dùng Model để thực hiện giải quyết logic, hiển thị thông tin lên màn hình,..

4. Folder Context
Sau khi định nghĩa table trong Entity, vào đây để định nghĩa DbSet và tạo bảng, update xuống database.

5. Folder Repository
Thực hiện các logic (đơn giản: mapping, CRUD,..) để controller gọi.

6. Folder Service
Thực hiện các logic, nghiệp vụ,... cũng để controller gọi.
