package selenium.tests;

import static org.junit.Assert.*;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import io.github.bonigarcia.wdm.ChromeDriverManager;

public class dummyTest
{
	private static WebDriver driver;
	
	@BeforeClass
	public static void setUp() throws Exception 
	{
		//driver = new HtmlUnitDriver();
		ChromeDriverManager.getInstance().setup();
		driver = new ChromeDriver();
	}
	
	@AfterClass
	public static void  tearDown() throws Exception
	{
		//driver.close();
		//driver.quit();
	}

	
	/*
	@Test
	public void googleExists() throws Exception
	{
		driver.get("http://www.google.com");
        assertEquals("Google", driver.getTitle());		
	}
	
*/
	
	
	
	
	
	@Test
	public void setUpRepository() throws Exception
	{
		driver.get("https://bottest1993.slack.com/");

		// Wait until page loads and we can see a sign in button.
		
		
		WebDriverWait wait = new WebDriverWait(driver, 30);

		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("signin_btn")));

		WebElement email = driver.findElement(By.id("email"));

		WebElement pw = driver.findElement(By.id("password"));
		
		email.sendKeys("vrpandey@ncsu.edu");

		pw.sendKeys("VikNC@28");
		
		WebElement signin = driver.findElement(By.id("signin_btn"));

		signin.click();

		//wait.until(ExpectedConditions.titleContains("general"));
		
		driver.get("https://bottest1993.slack.com/messages/bottesting/");

		//WebElement messageBot = driver.findElement(By.xpath("//*[@id='msg_input']/div[1]/p"));
		
		WebElement messageBot = driver.findElement(By.id("msg_input"));
		assertNotNull(messageBot);
			
		Actions actions = new Actions(driver);
		actions.moveToElement(messageBot);
		actions.click();
		actions.sendKeys("@abot start");
		actions.sendKeys(Keys.RETURN);
		actions.build().perform();

		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);

		WebElement msg = driver.findElement(
				By.xpath("//span[@class='message_body' ]"));
		assertNotNull(msg);
		
		
		Thread.sleep(2000);

		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//span[contains(@class,'message_body') and text() = 'Please enter the repo in which you want to find an expert']")));

		
		//Wrong case
		WebElement messageBot1 = driver.findElement(By.id("msg_input"));
		
		actions.moveToElement(messageBot1);
		actions.click();
		actions.sendKeys("wrongName");
		actions.sendKeys(Keys.RETURN);
		actions.build().perform();

		
		
		
		wait.withTimeout(10, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);

		msg = driver.findElement(
				By.xpath("//span[@class='message_body' and text() = 'sorry no repo found']"));
		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//span[contains(@class,'message_body') and text() = 'sorry no repo found']")));
		
		assertNotNull(msg);
		
		Thread.sleep(2000);
		
		messageBot1 = driver.findElement(By.id("msg_input"));
		
		actions.moveToElement(messageBot1);
		actions.click();
		actions.sendKeys("ncsu");
		actions.sendKeys(Keys.RETURN);
		actions.build().perform();


		
		
		
		wait.withTimeout(10, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);

		msg = driver.findElement(
				By.xpath("//span[@class='message_body' and text() = 'The issues from your git repository are being extracted!!!']"));
		assertNotNull(msg);
		
		
		
	}
	
	
	
	@Test
	public void checkExpertResults() throws Exception{
		
		

		driver.get("https://bottest1993.slack.com/");

		// Wait until page loads and we can see a sign in button.
		
		
		WebDriverWait wait = new WebDriverWait(driver, 30);

		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("signin_btn")));

		WebElement email = driver.findElement(By.id("email"));

		WebElement pw = driver.findElement(By.id("password"));
		
		email.sendKeys("vrpandey@ncsu.edu");

		pw.sendKeys("VikNC@28");
		
		WebElement signin = driver.findElement(By.id("signin_btn"));

		signin.click();

		//wait.until(ExpectedConditions.titleContains("general"));
		
		driver.get("https://bottest1993.slack.com/messages/bottesting/");

		//WebElement messageBot = driver.findElement(By.xpath("//*[@id='msg_input']/div[1]/p"));
		
		WebElement messageBot = driver.findElement(By.id("msg_input"));
		assertNotNull(messageBot);
		
		//unhappy case
		Actions actions = new Actions(driver);
		actions.moveToElement(messageBot);
		actions.click();
		actions.sendKeys("@abot find");
		actions.sendKeys(Keys.RETURN);
		actions.build().perform();
		
		Thread.sleep(5000);

		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);

		WebElement msg = driver.findElement(
				By.xpath("//span[@class='message_body' and text() = 'Please enter \"start\" to load data']"));
		assertNotNull(msg);
		
		
		Thread.sleep(5000);

		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//span[contains(@class,'message_body') and text() = 'Please enter \"start\" to load data']")));
		
		messageBot = driver.findElement(By.id("msg_input"));
		assertNotNull(messageBot);
			
		//actions = new Actions(driver);
		actions.moveToElement(messageBot);
		actions.click();
		actions.sendKeys("@abot start");
		actions.sendKeys(Keys.RETURN);
		actions.build().perform();
		
		Thread.sleep(2000);

		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);

		msg = driver.findElement(
				By.xpath("//span[@class='message_body' ]"));
		assertNotNull(msg);
		
		
		Thread.sleep(2000);

		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//span[contains(@class,'message_body') and text() = 'Please enter the repo in which you want to find an expert']")));

		
		
		messageBot =  driver.findElement(By.id("msg_input"));
		
		actions.moveToElement(messageBot);
		actions.click();
		actions.sendKeys("ncsu");
		actions.sendKeys(Keys.RETURN);
		actions.build().perform();


		
		Thread.sleep(2000);
		
		wait.withTimeout(10, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);

		msg = driver.findElement(
				By.xpath("//span[@class='message_body' and text() = 'The issues from your git repository are being extracted!!!']"));
		assertNotNull(msg);
		
		
		
	
		
		
		
		Thread.sleep(5000);

		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//span[contains(@class,'message_body') and text() = 'To find an expert, type find']")));

		
		messageBot =  driver.findElement(By.id("msg_input"));
		
		actions.moveToElement(messageBot);
		actions.click();
		actions.sendKeys("@abot find");
		actions.sendKeys(Keys.RETURN);
		actions.build().perform();


		
		Thread.sleep(2000);
		
		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);

		msg = driver.findElement(
				By.xpath("//span[@class='message_body' and text() = 'Enter the topic']"));
		assertNotNull(msg);
		
		
		
		
		
		Thread.sleep(2000);

		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//span[contains(@class,'message_body') and text() = 'Enter the topic']")));

		
		messageBot =  driver.findElement(By.id("msg_input"));
		
		actions.moveToElement(messageBot);
		actions.click();
		actions.sendKeys("parser");
		actions.sendKeys(Keys.RETURN);
		actions.build().perform();


		
		Thread.sleep(2000);
		
		wait.withTimeout(10, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);

		msg = driver.findElement(
				By.xpath("//span[@class='message_body' and text() = 'Are you happy with the results: yes/no']"));
		assertNotNull(msg);
		
		
		
		
		
		
		
		Thread.sleep(2000);

		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//span[contains(@class,'message_body') and text() = 'Are you happy with the results: yes/no']")));

		
		messageBot =  driver.findElement(By.id("msg_input"));
		
		actions.moveToElement(messageBot);
		actions.click();
		actions.sendKeys("yes");
		actions.sendKeys(Keys.RETURN);
		actions.build().perform();


		
		
		
		wait.withTimeout(10, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);

		msg = driver.findElement(
				By.xpath("//span[@class='message_body' and text() = 'Awesome, if you want to ask these experts a question, just type \"ask\"']"));
		assertNotNull(msg);
		
		
		
	}
	
	

}
