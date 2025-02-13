document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const seatNumber = document.getElementById('seatNumber').value;
    const classSelect = document.getElementById('classSelect').value;

    // بيانات وهمية للطلاب (يمكن استبدالها بقراءة من ملف Excel)
    const students = {
        '1': {
            '12345': {
                name: 'محمد أحمد',
                subjects: {
                    'عربي': 85,
                    'انجليزي': 90,
                    'فيزيا': 78,
                    'رياضيات': 88,
                    'تخصص نظري': 92,
                    'تخصص عملي': 95
                }
            }
        },
        '2': {
            '67890': {
                name: 'علي محمود',
                subjects: {
                    'عربي': 80,
                    'انجليزي': 85,
                    'فيزيا': 75,
                    'رياضيات': 82,
                    'تخصص نظري': 88,
                    'تخصص عملي': 90
                }
            }
        },
        '3': {
            '54321': {
                name: 'سارة خالد',
                subjects: {
                    'عربي': 90,
                    'انجليزي': 92,
                    'فيزيا': 85,
                    'رياضيات': 89,
                    'تخصص نظري': 94,
                    'تخصص عملي': 96
                }
            }
        }
    };

    const student = students[classSelect][seatNumber];

    if (student) {
        const totalMarks = Object.values(student.subjects).reduce((sum, mark) => sum + mark, 0);
        const percentage = ((totalMarks / (Object.keys(student.subjects).length * 100)) * 100).toFixed(2);
        const grade = getGrade(percentage);

        document.getElementById('studentName').textContent = student.name;
        document.getElementById('studentSeatNumber').textContent = seatNumber;

        const subjectsList = document.getElementById('subjectsList');
        subjectsList.innerHTML = '';
        for (const [subject, mark] of Object.entries(student.subjects)) {
            const li = document.createElement('li');
            li.textContent = `${subject}: ${mark}`;
            subjectsList.appendChild(li);
        }

        document.getElementById('totalMarks').textContent = totalMarks;
        document.getElementById('percentage').textContent = percentage;
        document.getElementById('grade').textContent = grade;

        document.getElementById('result').classList.remove('hidden');
        document.getElementById('errorMessage').classList.add('hidden');
    } else {
        document.getElementById('errorMessage').classList.remove('hidden');
        document.getElementById('result').classList.add('hidden');
    }
});

function getGrade(percentage) {
    if (percentage >= 90) return 'ممتاز';
    if (percentage >= 80) return 'جيد جدًا';
    if (percentage >= 70) return 'جيد';
    if (percentage >= 60) return 'مقبول';
    return 'ضعيف';
}