### 구현목록

- [x] 컴포넌트별 올바르지 않은 state 넣으면 오류 발생
- [ ] setState를 최적화해, 이전상태에서 변경이 있을 때만 render 호출
- [ ] 루트 탐색 중이 아닌 경우, 백스페이스 키를 눌렀을 때, 이전 경로로 이동

### 구현 중 생각

- 컴포넌트별 state 유효성 체크할 때, `selectedImageUrl`타입 관리를 어떻게?
  - 선택된 imageUrl을 가질 땐 `string`, 없을 땐 `null`인데.. 한 가지 타입으로 관리하는 게 편할 거 같아서 `null`대신 "" 빈 문자열 이용함
  - null로 하는 게 확실히 비었다는 걸 알기 편할 거 같은데...string, null 타입 둘 다 넣을 수 있는 게 좋은걸까?