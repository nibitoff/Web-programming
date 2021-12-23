import beans.TimeBean;
import entity.Result;
import utils.HitValidator;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.persistence.*;
import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@ManagedBean
@ApplicationScoped
public class ResultBean implements Serializable {
    private List<Result> resultList = new ArrayList<>();
    private Result newResult;
    private EntityManagerFactory entityManagerFactory;
    private EntityManager entityManager;
    private EntityTransaction entityTransaction;
    private final HitValidator validator = new HitValidator();

    public ResultBean() throws IOException {
        connectToDB();
        loadDB();
        newResult = new Result();
    }

    private void connectToDB() {
        try {
            entityManagerFactory = Persistence.createEntityManagerFactory("persist");
           System.out.println("CHECKING ERRORRS");
            entityManager = entityManagerFactory.createEntityManager();
            System.out.println("CHECKING ERRORS2");
            entityTransaction = entityManager.getTransaction();
            System.out.println("База данных успешна подключена!");
        } catch (Exception e) {
            System.out.println("Ошибка базы данных!" + e.getMessage());
        }
    }

    synchronized private void loadDB() {
        resultList = new ArrayList<>();
        try {
            entityTransaction.begin();
            System.out.println("CHECKING ERRORS12");
            resultList = entityManager.createQuery("SELECT d FROM Result d").getResultList();
            System.out.println("CHECKING ERRORS13");
            entityTransaction.commit();
            System.out.println("CHECKING ERRORS14");
        } catch (RuntimeException e) {
                if (entityTransaction.isActive()) {
                    entityTransaction.rollback();
                }
                System.out.println(e.getMessage());
        }
    }


    public void addResults() {
        try {
            long startTime = System.nanoTime();
            entityTransaction.begin();
            double executionTime = (System.nanoTime() - startTime);
            if ((validator.checkNull(newResult.getX(), newResult.getY(), newResult.getR()))) {
                newResult.setResult(validator.checkResult(newResult.getX(), newResult.getY(), newResult.getR()));
                TimeBean timeBean = new TimeBean();
                newResult.setCurrentTime(timeBean.learnTime(startTime));
                newResult.setExecutionTime(String.valueOf(executionTime));
                resultList.add(newResult);
                entityManager.persist(newResult);
                entityTransaction.commit();
                newResult = new Result();
            } else {
                System.out.println("Ошибка при проверке данных!");
            }
        } catch (RuntimeException e) {
            if (entityTransaction.isActive()) {
                entityTransaction.rollback();
            }
            System.out.println("Ошибка базы данных!");
        }
    }

    public void clearResults() {
        try {
            entityTransaction.begin();
            entityManager.createQuery("DELETE FROM Result").executeUpdate();
            resultList.clear();
            entityTransaction.commit();
        } catch (RuntimeException e) {
            if (entityTransaction.isActive()) {
                entityTransaction.rollback();
            }
        }
    }

    public Result getNewResult() {
        return newResult;
    }
    public List<Result> getResultList(){
        return resultList;
    }
    public void setResultList(List<Result> resultList){
        this.resultList = resultList;
    }
    public void setNewResult(Result newResult){
        this.newResult = newResult;
    }
}


