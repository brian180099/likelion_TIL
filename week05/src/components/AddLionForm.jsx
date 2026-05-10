function AddLionForm() {
  return (
    <form className="add-lion-form" hidden>
      <label>
        이름
        <input type="text" name="name" />
      </label>

      <label>
        파트
        <select name="part" defaultValue="Frontend">
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Design">Design</option>
        </select>
      </label>

      <label>
        관심 기술
        <input type="text" name="skills" />
      </label>

      <label>
        한 줄 소개
        <input type="text" name="oneLine" />
      </label>

      <label>
        자기소개
        <textarea name="introduction" />
      </label>

      <label>
        Email
        <input type="email" name="email" />
      </label>

      <label>
        Phone
        <input type="tel" name="phone" />
      </label>

      <label>
        Website
        <input type="url" name="website" />
      </label>

      <label>
        한 마디
        <input type="text" name="comment" />
      </label>

      <div className="form-buttons">
        <button type="button">랜덤 값 채우기</button>
        <button type="button">추가하기</button>
        <button type="button">취소</button>
      </div>
    </form>
  );
}

export default AddLionForm;