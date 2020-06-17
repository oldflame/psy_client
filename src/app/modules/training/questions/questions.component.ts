import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TrainingService } from '../../../services/training.service';
import { ToastService, TOAST_TYPE } from '../../../services/toast.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { QuestionCategory } from '../../../models/question-category';

@Component({
  selector: 'questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  @Input('questionCategory') questionCategory: QuestionCategory;

  @Output('responseSubmit') responseSubmit = new EventEmitter();

  questions: any[];

  questionnaireForm: FormGroup

  constructor(
    private trainingService: TrainingService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.trainingService
      .getQuestionsByCategory(this.questionCategory._id)
      .subscribe(
        (questions) => {
          this.questions = questions;
          console.log('Questions: ', this.questions);
          if (this.questions && this.questions.length > 0) {
            this.buildQuestionnaireForm();
          }
        },
        (err) => {
          this.toastService.showToast(err.error.msg, TOAST_TYPE.DANGER);
        }
      );
  }

  buildQuestionnaireForm() {
    const controls = {};
    this.questions.forEach(question => {
      controls[question._id] = new FormControl('', [Validators.required]);
    })

    this.questionnaireForm = new FormGroup(controls);
    console.log("Form: ", this.questionnaireForm);
  }

  submitResponse() {
    const responses = [];
    this.questions.forEach(question => {
      responses.push({
        questionId: question._id,
        name: question.name,
        answer: this.questionnaireForm.get(question._id).value
      })
    })

    this.responseSubmit.emit({
      questionCategory: this.questionCategory._id,
      responses
    })
  }

}
