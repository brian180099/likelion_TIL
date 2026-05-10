function ViewOptions() {
  return (
    <section className="view-options">
      <label className="option-item">
        <span>파트</span>
        <select defaultValue="전체">
          <option value="전체">전체</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Design">Design</option>
        </select>
      </label>

      <label className="option-item">
        <span>정렬</span>
        <select defaultValue="최신추가순">
          <option value="최신추가순">최신추가순</option>
          <option value="이름순">이름순</option>
        </select>
      </label>

      <label className="option-item">
        <span>검색</span>
        <input type="text" placeholder="이름으로 검색" />
      </label>
    </section>
  );
}

export default ViewOptions;